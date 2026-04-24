<script setup lang="ts">
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { PageTitle } from '@/shared/ui/page-title'
import { useProfile } from '@/entities/user'
import { PageSkeleton } from '@/shared/ui/page-skeleton'
import { ProfileReservationsTable, useGetUserReservations } from '@/entities/reservation'
import { computed } from 'vue'
import { LogoutButton } from '@/features/logout-button'
import { Message } from '@/shared/ui/message'
import { SkeletonTable } from '@/shared/ui/skeleton-table'
import { useGetUserSubscriptions } from '@/entities/subscription'
import { BookList, BookListSkeleton } from '@/entities/book'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primevue'
import { SendVerificationButton } from '@/features/send-verification-button'
import { ReviewCard, useGetUserReviews } from '@/entities/review'
import { SkeletonCard } from '@/shared/ui/skeleton-card'

const { profile, isFetching, isFetched } = useProfile()

const userId = computed(() => profile.value?.data.id)

const { subscriptions, isSubscriptionsFetched, isSubscriptionsFetching } =
  useGetUserSubscriptions(userId)

const { reviews, isReviewsFetched, isReviewsFetching } = useGetUserReviews(userId)

const { reservations, isReservationsFetching, isReservationsFetched } =
  useGetUserReservations(userId)

const activeReservations = computed(() =>
  reservations.value?.data.filter((item) => item.status === 'reserved' || item.status === 'issued'),
)
</script>

<template>
  <PageSkeleton v-if="isFetching && !profile" variant="profile" />
  <div v-if="isFetched" class="flex flex-col gap-4 w-full">
    <div class="flex flex-col md:flex-row justify-center md:justify-between">
      <div class="flex flex-col text-center">
        <PageTitle
          v-if="profile?.success"
          :title="profile?.data.name"
          class="text-center md:text-left"
        />
        <div class="flex flex-col gap-2">
          <div class="flex justify-center items-center gap-1">
            <span class="text-lg">{{ profile?.data.email }} </span>
            <span v-if="profile?.data.isVerified" class="pi pi-verified"></span>
          </div>
          <SendVerificationButton v-if="!profile?.data.isVerified" />
        </div>
      </div>

      <PageSubtitle title="профиль" />
    </div>
    <Tabs value="0">
      <TabList>
        <Tab value="0" class="uppercase">Отслеживаемое</Tab>
        <Tab value="1" class="uppercase">Активные брони</Tab>
        <Tab value="2" class="uppercase">Все брони</Tab>
        <Tab value="3" class="uppercase">Отзывы</Tab>
      </TabList>
      <TabPanels class="">
        <TabPanel value="0">
          <div class="flex flex-col gap-4 mt-8">
            <span class="text-xl uppercase font-semibold">Отслеживаемое:</span>
            <BookListSkeleton v-if="isSubscriptionsFetching" variant="default" />
            <BookList
              variant="default"
              v-if="subscriptions?.data && isSubscriptionsFetched"
              :items="subscriptions?.data"
            />
            <Message v-if="subscriptions?.data.length === 0 && isSubscriptionsFetched"
              >Отслеживаемое не найдены</Message
            >
          </div>
        </TabPanel>
        <TabPanel value="1">
          <div class="flex flex-col gap-4 mt-8">
            <span class="text-xl uppercase font-semibold">Активные брони:</span>
            <SkeletonTable v-if="isReservationsFetching && !reservations" />
            <ProfileReservationsTable
              v-if="activeReservations && activeReservations?.length > 0 && isReservationsFetched"
              :reservations="activeReservations"
            />
            <Message v-if="activeReservations?.length === 0 && isReservationsFetched"
              >Брони не найдены</Message
            >
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div class="flex flex-col gap-4 mt-8">
            <span class="text-xl uppercase font-semibold">Все брони:</span>
            <SkeletonTable v-if="isReservationsFetching && !reservations" />
            <ProfileReservationsTable
              v-if="reservations && reservations?.data.length > 0 && isReservationsFetched"
              :reservations="reservations.data"
            />
            <Message v-if="reservations?.data.length === 0 && isReservationsFetched"
              >Брони не найдены</Message
            >
          </div>
        </TabPanel>
        <TabPanel value="3">
          <div class="flex flex-col gap-4 mt-8">
            <span class="text-xl uppercase font-semibold">Отзывы:</span>
            <SkeletonCard v-if="isReservationsFetching && !reviews" />
            <ReviewCard
              variant="user"
              :key="review.id"
              :review="review"
              v-for="review in reviews?.data"
            />
            <Message v-if="reviews?.data.length === 0 && isReviewsFetched"
              >Отзывы не найдены</Message
            >
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
    <LogoutButton />
  </div>
</template>

<style scoped>
.p-tab-active {
  color: black;
  border-color: black;
}
.p-tabpanels {
  padding: 0;
}
</style>
