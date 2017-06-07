import './style.scss';
import { Motion, spring, StaggeredMotion } from 'react-motion';
import { Route, Link } from 'react-router-dom';
import React from 'react';
import Page from 'page';
import Project from 'project';
import ProjectAnimItem from 'projects/project-item';
import { length, last, reject, equals, map, merge } from 'ramda';
import {
  originRect,
  animOrigin,
  animWindow,
  inArray,
  addValidOnce,
  applySpring
} from 'helper-functions';

// Temp
const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const projectsArr = [];
let count = 10;
while (count--) {
  projectsArr.push({
    slug: `square-${count}`,
    backgroundColor: getRandomColor()
  });
}
const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// end temp

class Projects extends React.Component {
  constructor() {
    this.state = {
      activeSlug: null,
      activeSlugs: [],
      projects: projectsArr
    };
    this.updateAnimOrigin = this.updateAnimOrigin.bind(this);
  }

  componentDidMount() {
    this.updateAnimOrigin();
    window.addEventListener('resize', this.updateAnimOrigin);
    document
      .querySelector('.page')
      .addEventListener('scroll', this.updateAnimOrigin);
  }

  //Animation instance added here
  //Show project content flag removed here
  componentWillReceiveProps(nextProps) {
    const { activeSlugs } = this.state;
    const slug = this.getActiveSlug(nextProps);
    this.setState({
      activeSlug: slug,
      activeSlugs: addValidOnce(slug, activeSlugs),
      ...(!slug && { showProjectContent: false })
    });
  }

  //Animation instance removed here
  //Show project content flag set true here
  onRest(slug) {
    const { activeSlugs, activeSlug } = this.state;
    if (slug !== activeSlug) {
      this.setState({
        activeSlugs: reject(equals(slug), activeSlugs)
      });
    } else {
      this.setState({
        showProjectContent: true
      });
    }
  }

  //Cheap and easy way of seeing if this is a
  //project page
  getActiveSlug(props) {
    const path = props.location.pathname.split('/');
    return length(path) === 3 ? last(path) : null;
  }

  //Check whether the project is on its way out
  isAnimatingOut(slug) {
    const { activeSlugs, activeSlug } = this.state;
    return inArray(slug, activeSlugs) && activeSlug !== slug;
  }

  //Update the origin animation. This is done
  //declaratively so that we can change the originAnim
  //on the fly, necessary for the project to return to the correct
  //place while scrolling
  updateAnimOrigin() {
    const { projects } = this.state;
    this.setState({
      projects: map(
        x =>
          merge(x, {
            animOrigin: this.isAnimatingOut(x.slug)
              ? // If this is currently animating out, return it quicker
                animOrigin(x.slug, { stiffness: 200, precision: 50 })
              : animOrigin(x.slug)
          }),
        projects
      )
    });
  }

  render() {
    const {
      activeSlugs,
      activeSlug,
      projects,
      showProjectContent
    } = this.state;
    const fadeInSpringParams = {
      damping: 15,
      stiffness: 60
    };
    return (
      <Page>
        <div className="projects-container">
          <StaggeredMotion
            defaultStyles={projects.map(() => ({ opacity: 0, scale: 0.8 }))}
            styles={prevValues =>
              prevValues.map((_, i) => {
                const prev = prevValues[i - 1];
                return i === 0
                  ? applySpring({ opacity: 1, scale: 1 }, fadeInSpringParams)
                  : applySpring(
                      { opacity: prev.opacity, scale: prev.scale },
                      fadeInSpringParams
                    );
              })}
          >
            {interpolatingStyles => (
              <div className="projects-items-container">
                {interpolatingStyles.map((style, i) => {
                  let animRect;
                  const { slug, animOrigin, backgroundColor } = projects[i];
                  const animatingProject = inArray(slug, activeSlugs);
                  const active = slug === activeSlug;
                  if (animatingProject) {
                    if (active) {
                      animRect = animWindow();
                    } else {
                      animRect = animOrigin;
                    }
                  } else {
                    animRect = originRect(slug);
                  }
                  return (
                    <Link
                      key={i}
                      to={`projects/${slug}`}
                      className={`item ${slug}`}
                    >
                      <ProjectAnimItem
                        {...{
                          onRest: () => this.onRest(slug),
                          animatingProject,
                          backgroundColor,
                          originRect,
                          animRect,
                          active,
                          style
                        }}
                      />
                    </Link>
                  );
                })}
              </div>
            )}
          </StaggeredMotion>
          <Route
            path="/projects/:projectSlug"
            children={({ match }) => (
              <div>{match && showProjectContent && <Project />}</div>
            )}
          />
        </div>
      </Page>
    );
  }
}

export default Projects;
