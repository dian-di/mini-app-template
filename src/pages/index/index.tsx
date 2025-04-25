import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <div className='text-red-500'>
      <div>Hello world!</div>
    </div>
  )
}
