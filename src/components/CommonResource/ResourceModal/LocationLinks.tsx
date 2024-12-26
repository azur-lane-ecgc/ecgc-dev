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
        | "cycle"
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
    <div className={`${className}`}>
      {locations &&
        locations.map((location, index) => (
          <div key={index} className="text-[12px] leading-normal">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={`https://azurlane.koumakan.jp/wiki/${location.wikiLink.replaceAll(" ", "_")}`}
              className="font-bold !text-[#0047ab] bg-transparent no-underline hover:!text-[#3c5679] hover:underline active:!text-[#3c5679] active:underline"
            >
              {location.name}
            </a>{" "}
            <span className="text-black font-semibold">
              {location.notes && `(${location.notes})`}
              {location.quantity.amount && ` - ${location.quantity.amount}`}
              {location.quantity.timeFrame &&
                location.quantity.amount !== "RNG" && (
                  <>
                    {" "}
                    /{" "}
                    {location.quantity.timeFrame
                      .replace("daily", "Day")
                      .replace("weekly", "Week")
                      .replace("bimonthly", "2 Months")
                      .replace("monthly", "Month")
                      .replace("cycle", "Cycle")}
                  </>
                )}
            </span>
          </div>
        ))}
    </div>
  )
}
