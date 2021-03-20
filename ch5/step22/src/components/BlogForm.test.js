import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'



describe('5.16 test suite <BlogForm BlogCreation={BlogCreation}/>', () => {
  test('5.16', () => {
    const blogCreation = jest.fn()


    const component = render(
      <BlogForm BlogCreation={blogCreation} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('#form')

    fireEvent.change(title, {
      target: { value: 'rust is great' }
    })
    fireEvent.change(author, {
      target: { value: 'kostas' }
    })
    fireEvent.change(url, {
      target: { value: 'http://rustlang.com' }
    })
    fireEvent.submit(form)

    expect(blogCreation.mock.calls.length).toBe(1)
    expect(blogCreation.mock.calls[0][0]).toEqual({ title: 'rust is great', url: 'http://rustlang.com', author: 'kostas' })
  })
})