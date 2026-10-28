/** Props: category options, selected value, and change callback; state remains in App. */
function CategoryFilter({ categories, value, onChange }) {
  return <label className="filter-control"><span>Showing</span><select data-cy="filter" value={value} onChange={(event) => onChange(event.target.value)}><option>All</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
}

export default CategoryFilter