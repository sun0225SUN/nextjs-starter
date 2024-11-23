"use client"

import { useIsClient } from "~/hooks/use-client"
import { useBearStore } from "~/store/bear"

export function StoreDemo() {
  const bears = useBearStore((state) => state.bears)
  const addABear = useBearStore((state) => state.addABear)

  const isClient = useIsClient()

  if (!isClient) {
    return <div className="h-5" />
  }

  return (
    <div className="flex h-5 items-center gap-4">
      <div>{bears}</div>
      <button onClick={addABear}>Add a Bear</button>
    </div>
  )
}
