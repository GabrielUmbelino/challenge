import {
  useRef,
  useMemo,
  useState,
  useLayoutEffect,
  type PropsWithChildren,
  ReactNode,
} from 'react'
import styled from 'styled-components'
import RecipientsBadge from './RecipientsBadge'


type RecipientTooltipProps = PropsWithChildren<{ recipients: string[], children: ReactNode }>

function BaseRecipientTooltip({
  recipients,
  children,
  ...rest
}: RecipientTooltipProps) {
  return (
    <div {...rest}>
      <div className="tooltip-content">{children}</div>
      <div className="tooltip-panel">
        {recipients.map(recipient => (
          <div>{recipient}</div>
        ))}
      </div>
    </div>
  )
}

const RecipientTooltip = styled(BaseRecipientTooltip)`
  position: relative;

  .tooltip-content {
    cursor: default;
  }

  .tooltip-content:hover + .tooltip-panel {
    opacity: 1;
  }

  .tooltip-panel {
    opacity: 0;
    position: fixed;
    top: 8px;
    right: 8px;
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background: #666;
    color: #f0f0f0;
    border-radius: 24px;
  }
  .tooltip-panel div:not(:first-child):before {
    content: ', ';
  }
`

type RecipientsDisplayProps = PropsWithChildren<{ recipients: string[] }>

function RecipientsDisplay({ recipients, ...rest }: RecipientsDisplayProps) {
  const recipientsRef = useRef<HTMLDivElement>(null)
  const [trimRecipients, setTrimRecipients] = useState<boolean>(false)
  const [trimFirstRecipient, setTrimFirstRecipient] = useState<boolean>(false)
  const [trimRecipientsCount, setTrimRecipientsCount] = useState<number>(0)

  const formattedRecipients = useMemo(() => {
    if (!recipients.length) return []

    if (recipients.length === 1) return [recipients[0]]

    return recipients
  }, [recipients])

  useLayoutEffect(() => {
    if (!recipientsRef?.current?.parentElement) return
    if (
      recipientsRef.current.parentElement.clientWidth <
      recipientsRef.current.children[0].clientWidth
    ) {
      setTrimFirstRecipient(true)
    }

    if (
      recipientsRef.current.parentElement.clientWidth <
      recipientsRef.current.clientWidth
    ) {
      setTrimRecipients(true)
      setTrimRecipientsCount(recipientsRef.current.children.length - 1)
    }
  }, [recipients, recipientsRef?.current?.parentElement])

  return (
    <div {...rest}>
      <div className="content">
        <div
          className={`recipients ${trimFirstRecipient ? 'trimm-first' : ''}`}
          ref={recipientsRef}
        >
          {formattedRecipients.map(recipient => {
            return (
              <span className={`recipient ${trimRecipients ? 'trimmed' : ''}`}>
                {recipient}
              </span>
            )
          })}
        </div>
      </div>
      {trimRecipientsCount ? (
        <RecipientTooltip recipients={recipients}>
          <RecipientsBadge numTruncated={trimRecipientsCount} />
        </RecipientTooltip>
      ) : null}
    </div>
  )
}

export default styled(RecipientsDisplay)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
  border: solid 1px #000;
  background: #fff;
  overflow: hidden;
  position: relative;

  &.trimm-first {
    overflow: hidden;
  }

  .recipient {
    line-height: 1.4rem;
  }

  .trimmed:not(:first-child) {
    visibility: hidden;
  }

  .recipient:not(:first-child):before {
    content: ', ';
  }

  .recipient.trimmed:first-child:after {
    content: ', ...';
  }

  .recipients {
    height: 22px;
    display: flex;
    align-items: center;
  }

  .recipients.trimm-first {
    max-width: 100%;
  }

  .recipients.trimm-first .trimmed:first-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  .recipients.trimm-first .trimmed:not(:first-child) {
    display: none;
  }

  .recipients + span {
    position: absolute;
    right: 8px;
  }

  .content {
    max-width: calc(100% - 33px);
    overflow: hidden;
    display: flex;
  }
`
