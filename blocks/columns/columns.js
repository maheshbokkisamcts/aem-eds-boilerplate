export default function decorate(block) {

  // Fetch row ids, read it from metadata of document section/block
  const rowIds = [];
  if (block.parentNode.parentNode.classList.contains('columns-container')) {
    const attrValues = block.parentNode.parentNode.getAttribute('data-row-ids').split(',');
   attrValues?.length && attrValues.forEach((id) => {
      rowIds.push(id.trim());
    }) 
  }

  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row, index) => {
    // Add rowids to each row if available
    rowIds?.length && rowIds[index] && row.setAttribute('id', rowIds[index]);

    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}
