// SPDX-License-Identifier: ice License 1.0

import { Spinner, View } from "@my/ui";
import React from "react";

export const FullScreenLoading = () => {
  return (
    <View bc={'$background'} ac={'center'} jc={'center'}>
      <Spinner />
    </View>
  );
};

