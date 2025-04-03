import { db, doc, DocumentData } from "@firebaseApp"
import { getDocument, getRealTimeDataWithFilter } from "@helpers"

export const useTeamHook = () => {
  const getTeamMembers = async ({ adminId, onUpdate }: { adminId: string, onUpdate: (data: DocumentData) => void }) => {
    try {
      const userRef = doc(db, "users", adminId)
      const unsubscribe = await getRealTimeDataWithFilter("company", async (data: DocumentData) => {
        const userData = await Promise.all(data[0].users.map(async (item: DocumentData) => {
          return await getDocument("users", item.id)
        }))
        onUpdate(userData)
      }, "admin", "==", userRef)
      return unsubscribe;
    } catch (error) {
      console.log(error)
    }
  }

  return { getTeamMembers }
}