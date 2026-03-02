import { onMounted, onUnmounted, ref } from 'vue'

export const useHeaderStatus = () => {
  const isHeaderVisible = ref(true)
  let lastScrollY = ref(0)

  const handleScroll = () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > lastScrollY.value && currentScrollY > 200) {
      isHeaderVisible.value = false
    } else {
      isHeaderVisible.value = true
    }

    lastScrollY.value = currentScrollY
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
  return { isHeaderVisible }
}
