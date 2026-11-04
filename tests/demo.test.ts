import { describe, it, expect } from 'vitest'

describe('A truthy statement', () => {
  it('should be equal to 2', () => {
    expect(1+1).toEqual(2)
  })

  it('should be truthy', () => {
    expect(true).toBeTruthy()
  })
})
