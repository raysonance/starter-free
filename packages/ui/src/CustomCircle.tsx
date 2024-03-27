import { GetProps, YStack, styled } from 'tamagui' // or '@tamagui/core' if extending just that

export const CustomCircle = styled(YStack, {
  name: 'CustomCircle',
  backgroundColor: 'purple',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 100_000_000,
  overflow: 'hidden',

  variants: {
    size: {
      '...size': (size, { tokens }) => {
        return {
          width: tokens.size[size] ?? size,
          height: tokens.size[size] ?? size,
        }
      },
    },
  },
})

export type CustomCircleProps = GetProps<typeof CustomCircle>
