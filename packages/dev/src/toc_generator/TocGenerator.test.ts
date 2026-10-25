import { expect, spyOn, test } from "bun:test"
import * as fs from "node:fs/promises"

import { main as generateGuideToc } from "./TocGenerator"

test("writes guide headings once and skips introduction subsections", async () => {
  const write = spyOn(fs, "writeFile").mockResolvedValue(undefined)
  try {
    await generateGuideToc([
      {
        fileName: "Test Guide",
        content:
          '<h2 id="first">First <b>section</b></h2><h3 id="child">Child</h3>' +
          '<h2 id="intro">Introduction</h2><h3 id="skip">Skip this</h3>' +
          '<h2 id="last">Last section</h2><h3 id="last-child">Last child</h3>',
      },
    ])

    expect(write).toHaveBeenCalledTimes(1)
    expect(JSON.parse(String(write.mock.calls[0]?.[1]))).toEqual([
      {
        fileName: "Test Guide",
        toc: [
          {
            id: "first",
            content: "First section",
            subheadings: [{ id: "child", content: "Child" }],
          },
          {
            id: "last",
            content: "Last section",
            subheadings: [{ id: "last-child", content: "Last child" }],
          },
        ],
      },
    ])
  } finally {
    write.mockRestore()
  }
})
