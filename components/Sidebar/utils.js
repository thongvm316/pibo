export const hasChildren = (subMenuList) => {
  if (subMenuList.subMenu === null) {
    return false
  }

  if (subMenuList.subMenu.length === 0) {
    return false
  }

  return true
}
