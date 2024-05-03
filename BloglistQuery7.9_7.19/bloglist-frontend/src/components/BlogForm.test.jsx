import { render, screen } from '@testing-library/react'
import CreateNewBlog from './blogForm'
import userEvent from '@testing-library/user-event'

test('<CreateNewBlog/> updates parent state and calls onSubmit', async () => {
  const sendCreateNew = vi.fn()
  const user = userEvent.setup()
  let container
  render(<CreateNewBlog sendCreateNew={ sendCreateNew }/>)



  const input = screen.getByPlaceholderText('title')
  const sendButton = screen.getByText('Create')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(sendCreateNew.mock.calls).toHaveLength(1)
  expect(sendCreateNew.mock.calls[0][0].newBlog.title).toBe('testing a form...')
})