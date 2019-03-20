# HIGH LEVEL AUDIO DESCRIPTOR

This is a small pure Javascript object which attempts to calculate if the audio is too-low in relation to a given threshold of `floor`.

This deisgn usea a `delayline` buffer methodology. There is an inherent delay until all the data has been accumulated to perform the calculations.

The total buffer size can be changed altering the `MAX_BUFFER` property.