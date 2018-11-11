<template>
  <svg
    width="60"
    height="60"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    style="background: none;">
    <circle
      cx="50"
      cy="50"
      fill="none"
      :stroke="color"
      stroke-width="8"
      r="35"
      stroke-dasharray="164.93361431346415 56.97787143782138"
      transform="rotate(323.929 50 50)">
      <animateTransform
        attributeName="transform"
        type="rotate"
        calcMode="linear"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
        dur="1s"
        begin="0s"
        repeatCount="indefinite">
      </animateTransform>
    </circle>
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#fd0'
    }
  }
}
</script>
