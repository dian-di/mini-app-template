import { Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='text-blue-500'>
      <Text>Hello world!</Text>
    </View>
  )
}
