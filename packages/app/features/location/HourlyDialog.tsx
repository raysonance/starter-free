import { X } from '@tamagui/lucide-icons'
import {
  Adapt,
  Button,
  Dialog,
  Sheet,
  Unspaced,
  XStack,
} from 'tamagui'
import React from 'react'
import { WeatherData } from './WeatherCard'
import { HourlyComponent } from './Hourly'
import HourlyCard from './Hourlymodal'

export function HourlyDemo(props: HourlyProps) {
  const { hour, astro } = props
  return <WeatherHourlyDialogInstance hour={hour} astro={astro} />
}

type HourlyProps = {
  hour: WeatherData['forecast']['forecastday'][0]['hour'][0] | undefined
  astro?: WeatherData['forecast']['forecastday'][0]['astro']
}

function WeatherHourlyDialogInstance(props: HourlyProps) {
  const { hour, astro } = props
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <HourlyComponent hour={hour} />
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={2000000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          width={'90%'}
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$2"
        >
          <Dialog.Title>Hourly</Dialog.Title>

          <HourlyCard weather={hour} astro={astro} />

          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close">
                Close
              </Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
