describe('getSizePercent', () => {
  const sizeProperties = ['width', 'height'];

  sizeProperties.forEach(sizeProperty => {
    describe(sizeProperty, () => {
      const expectedPercent = 30;
      let element;
      let markup = `
        <style>
          .parent {
            ${sizeProperty}: 100px;
          }
          .parent .target {
            ${sizeProperty}: ${expectedPercent}%;
          }
        </style>
        <div class="parent">
          <div class="target"></div>
        </div>
      `;
      beforeEach(() => {
        element = document.createElement('div');
        element.innerHTML = markup;
        document.body.appendChild(element);
      });
      afterEach(() => {
        element.remove();
      });

      it(`should get element's ${sizeProperty}`, () => {
        const percentWidth = getSizePercent({ selector: '.parent .target', property: sizeProperty })
        expect(percentWidth).to.equal(`${expectedPercent}%`);
      });

      const differentWidths = ['80px', '120px', '20em', '40vw'];
      differentWidths.forEach(parentWidth => {
        it(`should get element's ${sizeProperty} when parent is ${parentWidth}`, () => {
          element.querySelector('.parent').style[sizeProperty] = parentWidth;
          const percentWidth = getSizePercent({ selector: '.parent .target', property: sizeProperty })
          expect(percentWidth).to.equal(`${expectedPercent}%`);
        });
      });

      describe('with pseudo element', () => {
        beforeEach(() => {
          markup = `
            <style>
              .target {
                ${sizeProperty}: 80px;
              }
              .target::after {
                content: '';
                display: block;
                ${sizeProperty}: ${expectedPercent}%;
              }
            </style>
            <div class="target"></div>
          `;
          element = document.createElement('div');
          element.innerHTML = markup;
          document.body.appendChild(element);
        });
        afterEach(() => {
          element.remove();
        });

        differentWidths.forEach(parentWidth => {
          it(`should get element's ${sizeProperty} when parent is ${parentWidth}`, () => {
            element.querySelector('.target').style[sizeProperty] = parentWidth;
            const percentWidth = getSizePercent({ selector: '.target::after', property: sizeProperty })
            expect(percentWidth).to.equal(`${expectedPercent}%`);
          });
        });
      });
    });
  });
});
