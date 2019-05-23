const puppeteer = require('puppeteer')

async function saveASlide (deckNickName, deckUrl, slideIndex) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const slideUrl = `${deckUrl}#${slideIndex}`
  const slideSavePath = `${deckNickName}-${slideIndex}.pdf`

  await page.goto(slideUrl, { waitUntil: 'networkidle2' })
  await page.emulateMedia('screen')
  await page.pdf({ path: slideSavePath, format: 'A4' })

  await browser.close()
}

function indexer (start, end, toRemove) {
  let result = []
  for (let i = start; i < end + 1; i++) {
    if (!toRemove.includes(i)) {
      result.push(i)
    }
  }
  console.log(result)
  return result
}

async function save (sectionNumber, url) {
  const deckNickName = 'Section ' + sectionNumber.toString()
  const deckUrl = url + sectionNumber.toString() + '/'
  const slideIndices = indexer(30, 54, [37, 43])
  Promise.all(slideIndices.map(
    slideIndex => saveASlide(
      deckNickName,
      deckUrl,
      slideIndex
    )
  ))
}

save(6)
