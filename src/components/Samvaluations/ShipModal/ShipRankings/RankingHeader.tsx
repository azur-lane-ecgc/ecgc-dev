import { endGameRankingsUpdateDate } from "@components/_common/Constants"

import { formatDate } from "@utils/formatDate"

export const RankingHeader: React.FC = () => {
  return (
    <>
      <h3 className="text-xl">
        <a
          href="https://docs.google.com/spreadsheets/d/13YbPw3dM2eN6hr3YfVABIK9LVuCWnVZF0Zp2BGOZXc0/edit?gid=0#gid=0"
          target="_blank"
          rel="noopener noreferrer"
          title="by Suchiguma and his team"
          aria-label="Rankings for End Game Azur Lane (by Suchiguma)"
        >
          Rankings for End Game Azur Lane
        </a>
      </h3>{" "}
      <p className="text-sm">
        <b>Last Updated</b>:{" "}
        <span className="text-[#00ffff]">
          {formatDate(endGameRankingsUpdateDate)}
        </span>
      </p>
    </>
  )
}
