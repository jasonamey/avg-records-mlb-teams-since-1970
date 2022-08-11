import fs from 'fs'

const data = fs.readFileSync('Teams.csv')

const seasons = {}

const average = (array) => array.reduce((a, b) => a + b) / array.length

function createReport(numOfBottomTeams, seasons) {
  let reportString = `FOR BOTTOM ${numOfBottomTeams} TEAMS :\n`
  for (const year in seasons) {
    const sortedSeason = seasons[year].sort((a, b) => a - b)
    seasons[year] = sortedSeason
    const yearLine = `${year} : ${average(
      sortedSeason.slice(0, numOfBottomTeams)
    ).toFixed(2)}\n`
    reportString += yearLine
  }
  reportString += '------------------\n'
  return reportString
}

for (const strRecord of data.toString().split('\n')) {
  const arrRecord = strRecord.split(',')
  const year = arrRecord[0]
  if (year < 1970) {
    continue
  }
  const wins = parseInt(arrRecord[8])
  if (seasons[year]) {
    seasons[year].push(wins)
  } else {
    seasons[year] = [wins]
  }
}

delete seasons['2020']
delete seasons['1994']
delete seasons['1981']
delete seasons['yearID']

let reportsString = ''
const arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

arr.forEach((num) => {
  reportsString += createReport(num, seasons)
})

fs.writeFileSync('loss-data.txt', reportsString)
