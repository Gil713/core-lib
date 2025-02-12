<script setup lang="ts">
type IProps = {
  game: IGame;
  isFetching?: boolean;
};

const props = defineProps<IProps>();
const blockGameDialogController = useDialog();
const addDisplayNameDialogController = useDialog();
const authDialogController = useDialog(DialogTypeEnum.LOGIN);

const { playGame } = usePlayGame();
const { getJackpotByAliasId } = useJackpot();
const handlePlayGame = (game?: IGame, isTrial?: boolean) => {
  playGame({
    game,
    isTrial,
    openLoginDialogFn: authDialogController.openDialog,
    openBlockGameDialogFn: blockGameDialogController.openDialog,
    openAddDisplayNameDialogFn: addDisplayNameDialogController.openDialog,
  });
};

const openCancelPromotionDialog = () => {
  console.log("openCancelPromotionDialog");
};

const gameTag = computed<IGameTag | undefined>(() => {
  if (props.game.maintain) return { name: GameTagEnum.MAINTAIN };
  else if (props.game.tags.name) return props.game.tags;
  return undefined;
});
</script>

<template>
  <button
    class="relative mb-auto"
    :disabled="game.maintain"
    :class="{ 'cursor-not-allowed': game.maintain }"
    @click="handlePlayGame(game)"
  >
    <Image
      v-bind="$attrs"
      :src="game.img"
      :alt="game.name"
      class="rounded-xl"
      height="73%"
      use-padding
      :show-overlay="!game.maintain"
      has-animation
    >
      <template #hovered-overlay>
        <div class="flex flex-col gap-1">
          <Button as="div" size="lg" class="w-[109px]">Chơi Ngay</Button>
          <Button v-if="game.is_demo" variant="link" class="underline" @click.stop="handlePlayGame(game, game.is_demo)">
            Chơi Thử
          </Button>
        </div>
      </template>

      <template #sub="{ isLoaded }">
        <div v-if="isLoaded && game.maintain" class="absolute z-image-top h-full w-full bg-[#060606]/70" />
        <GameTag v-if="isLoaded && gameTag" :tag="gameTag" />
      </template>
    </Image>
    <JackpotWrapper v-if="getJackpotByAliasId(game.partner_game_id)" class="m-auto bg-[transparent]">
      <AnimatedNumber :value="getJackpotByAliasId(game.partner_game_id)" :init-number="0" />
    </JackpotWrapper>
  </button>

  <AuthDialog
    v-if="authDialogController.isOpen.value"
    :controller="authDialogController"
    @login="handlePlayGame"
    @register="handlePlayGame"
  />

  <DialogBlockGame
    v-if="blockGameDialogController.isOpen.value"
    :controller="blockGameDialogController"
    @cancel-promotion="openCancelPromotionDialog"
  />

  <AddDisplayNameDialog
    v-if="addDisplayNameDialogController.isOpen.value"
    :controller="addDisplayNameDialogController"
    @succeed="handlePlayGame"
  />
</template>
