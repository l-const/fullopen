import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


describe('5.14 test suite', () => {

  test('5.14', () => {
    const blog = {
      likes: 6,
      author: 'Kostas',
      id: 'sdsdsd',
      url: 'http://kostas.com'
    }

    const component = render(
      <Blog blog={blog} />
    )
    component.debug()
    const div = component.container.querySelector('.hideD')
    const div2 = component.container.querySelector('.showD')
    expect(div).not.toHaveStyle('display: none')
    expect(div2).toHaveStyle('display: none')
  })
})


