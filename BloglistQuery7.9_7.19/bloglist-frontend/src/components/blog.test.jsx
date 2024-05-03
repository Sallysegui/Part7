import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog/>', () => {
  const blog = {
    title:'klnlknlk',
    author: 'ewrwer',
    url: 'www.sfdsadfas.com',
    likes: 3,
    id:'03924u02934u02iedmkx',
    user:{
      name:'lalala'
    }
  }
  const user = {
    id: 'sdf0w394jmfops'
  }
  const updateLikes = vi.fn()
  const removeBlog = vi.fn()
  const addLike = vi.fn()

  let container

  beforeEach(() => {

    container = render(
      <Blog buttonLabel="Show..." blog={blog} updateLikes={updateLikes} removeBlog={removeBlog} addLike = {addLike} user={user} >
        <div className="togglableContent" >
          togglable content
        </div>
      </Blog>
    ).container
  })



  test(' the like button is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    expect(updateLikes.mock.calls).toHaveLength(2)

  })


})

