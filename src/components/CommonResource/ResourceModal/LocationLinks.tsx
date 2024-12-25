interface LocationLinksProps {
  locations: {
    name: string
    wikiLink: string
    quantity: {
      amount: number | "RNG"
      timeFrame:
        | "one-time"
        | "daily"
        | "weekly"
        | "twice-monthly"
        | "monthly"
        | "bimonthly"
        | null
    }
    notes?: string
  }[]
  className?: string
}

export const LocationLinks: React.FC<LocationLinksProps> = ({
  locations,
  className = "",
}) => {
  return (
    <div className={className}>
      {locations &&
        locations.map((location, index) => (
          <div key={index} className="text-[13px] leading-normal">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={`https://azurlane.koumakan.jp/wiki/${location.wikiLink.replaceAll(" ", "_")}`}
            >
              {location.name}
            </a>{" "}
            <span>
              {location.notes && `(${location.notes})`} -{" "}
              {location.quantity.amount}{" "}
              {location.quantity.timeFrame &&
                location.quantity.timeFrame !== null &&
                location.quantity.amount !== "RNG" && (
                  <>
                    /{" "}
                    {location.quantity.timeFrame.charAt(0).toUpperCase() +
                      location.quantity.timeFrame
                        .slice(1)
                        .replace("Bimonthly", "2 Months")}
                  </>
                )}
            </span>
          </div>
        ))}
    </div>
  )
}
