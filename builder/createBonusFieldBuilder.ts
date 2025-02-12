export default function createBonusFieldBuilder() {
  const params: Partial<IBonusInfo> = {};

  return {
    buildTitle(title: IBonusInfo["title"]) {
      params.title = title;
      return this;
    },

    buildDescription(description: IBonusInfo["description"]) {
      params.description = description;
      return this;
    },

    buildDesClass(classEnum: IBonusInfo["desClass"]) {
      params.desClass = classEnum;
      return this;
    },

    build() {
      return params;
    },
  };
}
