import './style.scss';
import React from 'react';
import Page from 'page';

export default ({ showProjectContent = true, project: { color } }) => (
  <div
    className={`project-container ${showProjectContent ? 'show' : ''}`}
    style={{ color }}
  >
    <Page>
      <div className="project-title">Test title</div>
      <div className="description">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam arcu, scelerisque in nulla vel, scelerisque vulputate neque. Sed eleifend arcu orci, quis facilisis est tincidunt nec. Aliquam aliquam pharetra tortor, non viverra ante congue vel. Sed scelerisque varius augue id viverra. Cras hendrerit iaculis turpis, eu consequat augue hendrerit et. Integer porttitor lobortis odio congue iaculis. Aliquam varius pharetra tempor. Duis vitae velit scelerisque, ultricies mi ac, accumsan dolor. Cras vulputate orci eu elementum mollis. Phasellus sit amet eleifend neque.
        </p>
        <p>
          Proin orci ex, vestibulum non placerat commodo, tristique vitae urna. Vivamus accumsan justo at ligula congue, id dictum metus mollis. Morbi vel nulla vel nibh suscipit feugiat. Nunc ex arcu, pretium ac ornare id, malesuada non turpis. Aliquam aliquam tortor libero, eu mollis nulla egestas quis. Fusce ac commodo ex, eu sollicitudin ligula. Nam non enim orci. Suspendisse eu arcu a urna tempus maximus. Suspendisse sit amet dui lectus. Donec facilisis a ex at eleifend. Sed aliquet tempor efficitur. Maecenas id finibus tortor, eu tincidunt justo.
        </p>
        <p>
          Praesent id cursus diam, eget sollicitudin nibh. Cras hendrerit dolor vitae lacus tristique, quis varius ex pharetra. Pellentesque porttitor dolor at nulla cursus, eget auctor neque convallis. Sed interdum eget orci laoreet tempus. Vestibulum iaculis eget lacus at suscipit. Vestibulum auctor ex nisi, non commodo tellus tincidunt ac. Praesent eu ipsum id odio luctus tempor. Nulla id ipsum finibus, hendrerit quam at, malesuada lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc lacinia libero odio, sed gravida quam mattis feugiat. Praesent laoreet finibus mi, vitae congue dolor eleifend eget. Etiam luctus vel libero in finibus. Aliquam erat volutpat. Nunc sed lacus molestie, suscipit risus consequat, elementum risus.
        </p>
      </div>
    </Page>
  </div>
);
