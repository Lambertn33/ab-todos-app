import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return <div>{t("sidebar.home")}</div>;
};

export default Home;
