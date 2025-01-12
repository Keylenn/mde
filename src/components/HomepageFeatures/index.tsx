import type { ReactNode, FC } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "更好用的工具 🧰",
    Svg: require("@site/static/img/feature-tool.svg").default,
    description: <>@TODO</>,
  },
  {
    title: "更好用的工具 🧰",
    Svg: require("@site/static/img/feature-tool.svg").default,
    description: <>@TODO</>,
  },
  {
    title: "更好用的工具 🧰",
    Svg: require("@site/static/img/feature-tool.svg").default,
    description: <>@TODO</>,
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

const HomepageFeatures: FC = () => {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomepageFeatures;
