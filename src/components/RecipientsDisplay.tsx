import {
  useRef,
  useMemo,
  useState,
  type PropsWithChildren,
  ReactNode,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react'
import styled from 'styled-components'
import RecipientsBadge from './RecipientsBadge'

type RecipientTooltipProps = PropsWithChildren<{
  recipients: string[]
  children: ReactNode
}>

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
          <div key={recipient}>{recipient}</div>
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
    flex-wrap: wrap;
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
  const [recipientsWidth, setRecipientsWidth] = useState(0)
  const [recipientsParentWidth, setRecipientsParentWidth] = useState(0)
  const [firstRecipientWidth, setFirstRecipientWidth] = useState(0)

  const formattedRecipients = useMemo(() => {
    if (!recipients.length) return []
    if (recipients.length === 1) return [recipients[0]]

    return recipients
  }, [recipients])

  useEffect(() => {
    if (!recipientsParentWidth) return

    if (recipientsParentWidth < firstRecipientWidth) {
      setTrimFirstRecipient(true)
    } else {
      setTrimFirstRecipient(false)
    }

    if (recipientsParentWidth < recipientsWidth) {
      setTrimRecipients(true)
      setTrimRecipientsCount(
        recipientsRef?.current?.children?.length
          ? recipientsRef.current.children.length - 1
          : 0,
      )
    } else {
      setTrimRecipientsCount(0)
      setTrimRecipients(false)
    }
  }, [recipients, recipientsWidth, recipientsParentWidth, firstRecipientWidth])

  const updateWidth = useCallback(() => {
    if (!recipientsRef.current?.parentElement) return
    setRecipientsParentWidth(recipientsRef.current.parentElement.clientWidth)
    setRecipientsWidth((_prev: number) => {
      if (!recipientsRef?.current?.parentElement?.clientWidth) return 0
      if (
        recipientsRef.current.parentElement.clientWidth ===
        recipientsRef.current.clientWidth
      ) {
        return recipientsRef.current.clientWidth + 1
      }
      return recipientsRef.current.clientWidth
    })

    setFirstRecipientWidth((_prev: number) => {
      if (!recipientsRef?.current) return 0
      if (
        recipientsRef.current.clientWidth ===
        recipientsRef.current.children[0].clientWidth
      ) {
        return recipientsRef.current.children[0].clientWidth + 1
      }
      return recipientsRef.current.children[0].clientWidth
    })
  }, [recipientsRef.current?.parentElement?.clientWidth])

  useLayoutEffect(() => {
    updateWidth()
  }, [recipientsRef])

  useEffect(() => {
    window.addEventListener('resize', updateWidth)
    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  return (
    <div {...rest}>
      <div className="content">
        <div
          className={`recipients ${trimFirstRecipient ? 'trimm-first' : ''}`}
          ref={recipientsRef}
        >
          {formattedRecipients.map(recipient => {
            return (
              <span
                key={recipient}
                className={`recipient ${trimRecipients ? 'trimmed' : ''}`}
              >
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

  .recipients.trimm-first .recipient:first-child {
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
    width: 100%;
    max-width: calc(100% - 33px);
    overflow: hidden;
    display: flex;
  }
`
