import { type PropsWithChildren, useMemo } from 'react'
import styled from 'styled-components'
import RecipientsBadge from './RecipientsBadge'

type RecipientsDisplayProps = PropsWithChildren<{ recipients: string[] }>

function RecipientsDisplay({ recipients, ...rest }: RecipientsDisplayProps) {
  const formattedRecipients = useMemo(() => {
    if (!recipients.length) return ''

    if (recipients.length === 1) return recipients[0]

    return recipients.join(', ')
  }, [recipients])

  return (
    <div {...rest}>
      <span className='recipients-display'>
        {formattedRecipients}
      </span>
      <RecipientsBadge numTruncated={recipients.length} />
    </div>
  )
}

export default styled(RecipientsDisplay)`
  display: flex;
  justify-content: space-between;
  padding: 7px 8px;
  border: solid 1px #000;
  background: #fff;
  overflow: hidden;

  span.recipients-display {
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4rem;
  }
`