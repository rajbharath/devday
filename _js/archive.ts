import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { div, article, a, i, span, header, h4, h5, footer, makeDOMDriver } from '@cycle/dom';

function getDisplayTime(time) {
  var timeSplits = new Date(time).toString().split(' ');
  return timeSplits[2] + ' ' + timeSplits[1] + ' ' + timeSplits[3];
}

function main({ dom }) {
  return {
    dom: xs.periodic(200)
      .map(n =>
        div('.panel', window.events
          .filter(event => new Date(event.time) - new Date() < 0)
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .map(event =>
            article('.centered', [
              div('.event.card', [
                a('.go.to.event.button', { props: { href: window.baseUrl + event.url } }, [
                  i('.material-icons', 'arrow_forward'),
                  span('.hidden', 'Go')
                ]),
                header([
                  h4([event.name])
                ]),
                div('.content', [
                  h5(getDisplayTime(event.time)),
                  event.abstract
                ]),
                footer([
                  i('.material-icons', 'label'),
                  ...event.tags.map(tag =>
                    a('.tag', { props: { href: window.baseUrl + '/tags/' + tag.replace(' ', '-') } }, tag)
                  ),
                  a('.right.button', { props: { href: window.baseUrl + event.url } }, 'View Event')
                ])
              ])
            ])
          ))
      )
  };
}

run(main, { dom: makeDOMDriver('main') });