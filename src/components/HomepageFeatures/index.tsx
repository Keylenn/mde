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
    title: "功能实用化 🎯",
    Svg: require("@site/static/img/tools.svg").default,
    description: <>针对常见但市面上还没有最佳实践的场景提供可靠的解决方案</>,
  },
  {
    title: "需求定制化 🏗",
    Svg: require("@site/static/img/factory.svg").default,
    description: <>我们提供通用的底层的功能实现，您自行结合需求场景进行定制</>,
  },
  {
    title: "内容专区化 🗂",
    Svg: require("@site/static/img/blocks.svg").default,
    description: (
      <>
        把文档通过专区进行划分，既保留了功能的集中性，也兼顾了功能归属，方便大家快速定向查找
      </>
    ),
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
