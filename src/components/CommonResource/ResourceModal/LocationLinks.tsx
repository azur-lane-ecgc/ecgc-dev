interface LocationLinksProps {
  locations?: {
    name: string
    wikiLink: string
    quantity: {
      amount?: number | "RNG" | null
      timeFrame?:
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
    <div className={`${className} hidden group-hover:block`}>
      {locations &&
        locations.map((location, index) => (
          <div key={index} className="text-[12px] leading-normal">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={`https://azurlane.koumakan.jp/wiki/${location.wikiLink.replaceAll(" ", "_")}`}
              className="font-bold !text-[#0047ab] bg-transparent no-underline hover:!text-[aqua] hover:underline active:!text-[aqua] active:underline"
            >
              {location.name}
            </a>{" "}
            <span className="text-black font-semibold">
              {location.notes && `(${location.notes})`}
              {location.quantity.amount && ` - ${location.quantity.amount}`}
              {location.quantity.timeFrame &&
                location.quantity.timeFrame !== null &&
                location.quantity.amount !== "RNG" && (
                  <>
                    {" "}
                    /{" "}
                    {location.quantity.timeFrame.charAt(0).toUpperCase() +
                      location.quantity.timeFrame
                        .slice(1)
                        .replace(/Daily/g, "Day")
                        .replace(/Weekly/g, "Week")
                        .replace(/Monthly/g, "Month")
                        .replace(/Bimonthly/g, "2 Months")}
                  </>
                )}
            </span>
          </div>
        ))}
    </div>
  )
}
