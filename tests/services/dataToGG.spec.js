const expect = require("chai").expect
import { orgChart } from './../../app/services/dataToGG'

describe("orgChart()", () => {

	it("A single level will return just one shape", () => {
		const data = [
		{
			"name": "Reece Harris",
			"children":  []
		} ] 
		const result = orgChart(data)
		expect(result).to.eql([
			[
			{ shapes: "Rect", width: 100, height: 100, fill: 0xFF7F3F },
			{ transforms: [ { transforms: "Translate", x: 110, y: 110 } ]
			}
			]
			])
	})
	

	it("If there are two items two shapes will be returned with a padding between them", () => {
		const data = [
		{
			"name": "Reece Harris",
			"children":  []
		},
		{
			"name": "Reece Harris",
			"children":  []
		} ] 
		const result = orgChart(data)
		expect(result).to.eql([
			[
				{ shapes: "Rect", width: 100, height: 100, fill: 0xFF7F3F },
				{ transforms: [ { transforms: "Translate", x: 110, y: 110 } ] }
			],
			[
				{ shapes: "Rect", width: 100, height: 100, fill: 0xFF7F3F },
				{ transforms: [ { transforms: "Translate", x: 220, y: 110 } ] }
			]
			])
	})

	it("If a shape is nested it will have a lower y value", () => {
		const data = [
		{
			"name": "Reece Harris",
			"children":  [
			{
				"name": "Reece Harris",
				"children":  []
			}
			]
		},
		{
			"name": "Reece Harris",
			"children":  []
		} ] 
		const result = orgChart(data)
		expect(result).to.eql([
			[
				{ shapes: "Rect", width: 100, height: 100, fill: 0xFF7F3F },
				{ transforms: [ { transforms: "Translate", x: 110, y: 110 } ] }
			],
			[
				{ shapes: "Rect", width: 100, height: 100, fill: 0xFF7F3F },
				{ transforms: [ { transforms: "Translate", x: 110, y: 220 } ] }
			],
			[
				{ shapes: "Rect", width: 100, height: 100, fill: 0xFF7F3F },
				{ transforms: [ { transforms: "Translate", x: 220, y: 110 } ] }
			]
			])
	})

})