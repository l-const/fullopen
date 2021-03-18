import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


describe('5.14 test suite', () => {
  let component

  beforeEach(() => {
    const blog = {
      likes: 6,
      author: 'Kostas',
      id: 'sdsdsd',
      url: 'http://kostas.com'
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('5.13', () => {
    const div = component.container.querySelector('.hideD')
    const div2 = component.container.querySelector('.showD')
    expect(div).not.toHaveStyle('display: none')
    expect(div2).toHaveStyle('display: none')
  })
  test('5.14', () => {
    const div = component.container.querySelector('.hideD')
    const div2 = component.container.querySelector('.showD')

    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)

    expect(div).toHaveStyle('display: none')
    expect(div2).not.toHaveStyle('display: none')
  })
  test('5.15', () => {
    const div = component.container.querySelector('.hideD')
    const div2 = component.container.querySelector('.showD')
    expect(div).not.toHaveStyle('display: none')
    expect(div2).toHaveStyle('display: none')
  })
})


