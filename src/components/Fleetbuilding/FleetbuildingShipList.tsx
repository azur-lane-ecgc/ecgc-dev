import { ItemContainer } from "@components/_common/ItemCell"
import { ShipModal } from "@components/_common/ShipModal"
import type { ShipData } from "@db/types"
import type React from "react"

interface Props {
  ships: ShipData[]
}

export const FleetbuildingShipList: React.FC<Props> = ({
  ships,
}): React.ReactNode => {
  const groups = {
    permanent: ships.filter((s) => s.permanent.isPermanent),
    event: ships.filter(
      (s) => !s.permanent.isPermanent && !s.permanent.isCollab,
    ),
    collab: ships.filter((s) => s.permanent.isCollab),
  }

  const renderGroup = (title: React.ReactNode, list: ShipData[]) =>
    list.length ? (
      <>
        <h5>{title}</h5>
        <ItemContainer>
          {list.map((ship) => (
            <ShipModal
              key={ship.id}
              shipData={ship}
              trigger={{
                hasBorder: true,
                iconNote: null,
                descriptionNote: null,
                largeDescNote: null,
              }}
              loading={false}
            />
          ))}
        </ItemContainer>
        <br />
      </>
    ) : null

  return (
    <>
      {renderGroup("Permanently Available:", groups.permanent)}
      {renderGroup("Event-Locked:", groups.event)}
      {renderGroup(
        <>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://azurlane.koumakan.jp/wiki/Events#Collaboration_Events"
            title="Collaboration Events"
            aria-label="Events#Collaboration_Events"
            className="inline-block"
          >
            Collaboration
          </a>
          :
        </>,
        groups.collab,
      )}
    </>
  )
}
