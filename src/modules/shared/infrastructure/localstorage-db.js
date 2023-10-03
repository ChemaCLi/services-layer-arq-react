import { generateUuid } from './uuid-generator'
import { getTodayDate } from '../application/today-date'

const sleep = ms =>
  new Promise(resolve => setTimeout(resolve, ms))

const createEntry = (entityName, data) => {
  data.id = generateUuid('v4') // generate a random id
  data.createdAt = getTodayDate()
  return saveData(entityName, data)
}

const updateEntry = (entityName, data) => {
  if (!data.id) throw new Error("The ID is required")
  return saveData(entityName, data)
}

const saveData = async (entityName, data) => {
  const items = await getData(entityName) ?? []

  const updatedItems = updateItemInItemsById(data, items)
  localStorage.setItem(entityName, JSON.stringify(updatedItems))

  return data
}

const updateItemInItemsById = (item, items = []) => {
  const idx = items.findIndex(i => i.id === item.id)

  if (idx === -1) {
    items.push(item)
    return items
  }

  const prevItem = items[idx]
  const newItem = { ...prevItem, ...item }
  items[idx] = newItem
  return items
}

const getData = async entity => {
  await sleep(500)
  return JSON.parse(localStorage.getItem(entity))
}

const getFullItemById = async (entity, id) => {
  const items = await getData(entity) ?? []
  const item = items.find(i => i.id === id)
  return item
}

const removeItemById = async (entity, id) => {
  const items = await getData(entity) ?? []
  const idx = items.findIndex(i => i.id === id)

  if (idx === -1) return items
  items.splice(idx, 1)
  localStorage.setItem(entity, JSON.stringify(items))

  return items
}

export const LocalStorageDB = {
  getData,
  saveData,
  updateEntry,
  createEntry,
  removeItemById,
  getFullItemById
}
