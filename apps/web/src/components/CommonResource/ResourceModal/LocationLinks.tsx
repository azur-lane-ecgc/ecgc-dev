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
        | "chapter"
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
  if (!!!locations) {
    return false
  }
  return (
    <div className={`${className}`}>
      {locations.map((location, index) => (
        <div
          key={index}
          className="text-[12px] leading-normal md:text-[12.5px] lg:text-[13px]"
        >
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`https://azurlane.koumakan.jp/wiki/${location.wikiLink.replaceAll(
              " ",
              "_",
            )}`}
            title={location.name}
            aria-label={location.name}
            className="bg-transparent font-bold !text-[#0047ab] no-underline hover:!text-[#3c5679] hover:underline active:!text-[#3c5679] active:underline"
          >
            {location.name}
          </a>{" "}
          <span className="font-semibold text-black">
            {location.notes && `(${location.notes})`}
            {location.quantity.amount && ` - ${location.quantity.amount}`}
            {location.quantity.timeFrame &&
              location.quantity.timeFrame !== "one-time" &&
              location.quantity.amount !== "RNG" && (
                <>
                  {" "}
                  /{" "}
                  {location.quantity.timeFrame
                    .replace("daily", "Day")
                    .replace("weekly", "Week")
                    .replace("bimonthly", "2 Months")
                    .replace("monthly", "Month")
                    .replace("cycle", "Cycle")
                    .replace("chapter", "Chapter")}
                </>
              )}
          </span>
        </div>
      ))}
    </div>
  )
}
