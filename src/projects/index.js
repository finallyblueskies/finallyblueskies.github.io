import './style.scss';
import { Motion, spring, StaggeredMotion } from 'react-motion';
import { Route, Link } from 'react-router-dom';
import React from 'react';
import Page from 'page';
import Project from 'project';
import ProjectAnimation from 'project/animation';

// Temp

const projects = [];
let count = 10;
while (count--) {
  projects.push({
    title: `square-${count}`
  });
}
const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// end temp

const animStyles = vals => {
  return {
    opacity: vals.opacity,
    transform: `scale(${vals.scale}) translate3d(0,0,0)`
  };
};

export default () => {
  return (
    <Page>
      <div className="projects-container">
        <StaggeredMotion
          defaultStyles={projects.map(() => ({ opacity: 0, scale: 0.8 }))}
          styles={prevValues =>
            prevValues.map((_, i) => {
              const prev = prevValues[i - 1];
              return i === 0
                ? { opacity: spring(1), scale: spring(1) }
                : { opacity: spring(prev.opacity), scale: spring(prev.scale) };
            })}
        >
          {interpolatingStyles => (
            <div>
              {interpolatingStyles.map((styleValues, i) => (
                <Link
                  to={`projects/${projects[i].title}`}
                  className={`item ${projects[i].title}`}
                  key={i}
                  style={animStyles(styleValues)}
                />
              ))}
            </div>
          )}
        </StaggeredMotion>
      </div>
      <Route
        path="/projects/:projectSlug"
        children={({ match }) => (
          <ProjectAnimation {...{ match }}>
            <Project />
          </ProjectAnimation>
        )}
      />
    </Page>
  );
};
