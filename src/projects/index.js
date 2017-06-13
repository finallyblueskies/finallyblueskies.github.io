import './style.scss';
import React from 'react';
import Page from 'page';
import Project from 'project';
import ProjectData from 'projects/data';
import ProjectAnimItem from 'projects/project-anim-item';

import { Motion, spring, StaggeredMotion } from 'react-motion';
import { Route, Link } from 'react-router-dom';
import { length, last, reject, equals, map, merge, find, propEq } from 'ramda';

import {
  originRect,
  windowRect,
  applySpring,
  fadeInSpringParams
} from 'helpers/motion';

import { setGlobalState, getGlobalState } from 'helpers/general';

import { inArray, addValidOnce } from 'helpers/general';

const applyProjectAnimState = (
  project,
  activeSlug,
  activeSlugs,
  noSpringFlag
) => {
  const { slug } = project;
  let projectStyles;
  //If animating
  if (inArray(slug, activeSlugs)) {
    //If animating in
    if (slug === activeSlug) {
      projectStyles = windowRect();
      //Animating out
    } else {
      projectStyles = originRect(slug);
    }
    if (!noSpringFlag) {
      projectStyles = applySpring(projectStyles);
    }
  } else {
    projectStyles = originRect(slug);
  }

  return merge(project, { projectStyles });
};

class Projects extends React.Component {
  constructor(props) {
    super(props);
    const slug = this.getActiveSlug(props);
    this.state = {
      activeSlug: slug,
      activeSlugs: slug ? [slug] : [],
      showProjectContent: !!slug,
      projects: ProjectData
    };
    this.updateProjectAnim = this.updateProjectAnim.bind(this);
  }

  componentDidMount() {
    this.updateProjectAnim(this.props, true);
    window.addEventListener('resize', () =>
      this.updateProjectAnim(this.props, true)
    );
    document
      .querySelector('.page')
      .addEventListener('scroll', () =>
        this.updateProjectAnim(this.props, true)
      );
  }

  //Show project content flag removed here
  componentWillReceiveProps(nextProps) {
    const { activeSlugs } = this.state;
    this.updateProjectAnim(nextProps);
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

  updateProjectAnim(props, noSpringFlag) {
    const { projects, activeSlugs } = this.state;
    const activeSlug = this.getActiveSlug(props);
    const newActiveSlugs = addValidOnce(activeSlug, activeSlugs);

    if (activeSlug) {
      setGlobalState({
        globalStyles: {
          color: find(propEq('slug', activeSlug))(projects).color
        }
      });
    } else {
      setGlobalState({
        globalStyles: null
      });
    }

    this.setState({
      activeSlug,
      activeSlugs: newActiveSlugs,
      projects: map(project =>
        applyProjectAnimState(project, activeSlug, newActiveSlugs, noSpringFlag)
      )(projects),
      ...(!activeSlug && { showProjectContent: false })
    });
  }

  render() {
    const {
      activeSlugs,
      activeSlug,
      projects,
      showProjectContent
    } = this.state;
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
                  const {
                    slug,
                    animOrigin,
                    backgroundColor,
                    projectStyles
                  } = projects[i];
                  const animatingProject = inArray(slug, activeSlugs);
                  const active = slug === activeSlug;
                  return (
                    <Link
                      key={i}
                      to={`projects/${slug}`}
                      className={`item ${slug}`}
                    >
                      <div
                        className={`project-image`}
                        style={{
                          ...(!animatingProject && { opacity: 1 }),
                          ...(animatingProject && {
                            userSelect: 'none',
                            zIndex: 100
                          })
                        }}
                      />
                      <ProjectAnimItem
                        {...{
                          onRest: () => this.onRest(slug),
                          animatingProject,
                          backgroundColor,
                          projectStyles,
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
              <div>
                {match && <div className="project-overlay" />}
                {match &&
                  <Project
                    {...{
                      showProjectContent,
                      project: find(propEq('slug', activeSlug))(projects)
                    }}
                  />}
              </div>
            )}
          />
        </div>
      </Page>
    );
  }
}

export default Projects;
