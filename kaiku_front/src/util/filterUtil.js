// generic filter utility for searching messages / users from a string arr
// ie: array = users.map(u => u.name) || array = messages.map(m => m.content)
const filterUtil = (array, filterInput) =>
  array.filter(str =>
    str.toLowerCase().includes(filterInput.toLowerCase()))

export default filterUtil