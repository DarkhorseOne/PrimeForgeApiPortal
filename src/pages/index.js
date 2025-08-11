import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import services from '../../services.json';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function ServiceCard({ service }) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <div className="card">
        <div className="card__header">
          <h3>{service.title || service.name}</h3>
        </div>
        <div className="card__body">
          <p>Click below to view API documentation for <strong>{service.title || service.name}</strong>.</p>
        </div>
        <div className="card__footer">
          <a className="button button--secondary button--block" href={`/api/${service.name}`}>
            Open Docs
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome`}
      description="Unified API documentation for our microservices">
      <HomepageHeader />
      <main>
        <section className="container margin-top--lg">
          <div className="row">
            {services.map((service) => (
              <ServiceCard key={service.name} service={service} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}