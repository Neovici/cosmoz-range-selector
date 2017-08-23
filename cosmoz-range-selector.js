(function () {
	'use strict';

	Polymer({
		is: 'cosmoz-range-selector',
		properties: {
			/**
			 * FromLabel is the label place holder for the first input.
			 * @type {[type]}
			 */
			fromLabel: {
				type: String
			},
			toLabel: {
				type: String
			},
			label: {
				type: String
			},
			min: {
				type: Number
			},
			_minComputed: {
				type: Number,
				computed: '_computeMin(min)'
			},
			max: {
				type: Number
			},
			_maxComputed: {
				type: Number,
				computed: '_computeMax(max)'
			},
			list: {
				type: Array
			},
			_useListComputed: {
				type: Boolean,
				computed: '_listEmpty(list)'
			},
			fromValue: {
				type: Number
			},
			toValue: {
				type: Number
			},
			labelValue: {
				type: String,
				computed: '_("From {0} to {1}", fromValue, toValue, t)'
			},
			values: {
				type: Object,
				notify: true,
				computed: '_computeValues(fromValue, toValue)',
				observer: '_valuesChanged'
			},
			listLabel: {
				type: String
			}
		},
		behaviors: [
			Cosmoz.TranslatableBehavior
		],
		_listEmpty: function (list) {
			return list === undefined || list.length === 0;
		},
		_computeMin: function (min) {
			var minFloor = Math.floor(min);
			this.fromValue = minFloor;
			return minFloor;
		},
		_computeMax: function (max) {
			var maxCeil = Math.ceil(max);
			this.toValue = maxCeil;
			return maxCeil;
		},
		toggle: function () {
			this.$.dropdown.open();
		},
		_computeValues: function (fromValue, toValue) {
			return {
				fromValue: fromValue === '' ? this.max : fromValue,
				toValue: toValue === '' ? this.max : toValue
			};
		},
		_valuesChanged: function (values) {
			var that = this;
			that.debounce('rangeChangedJob', function () {
				that.fire('range-changed', {
					data: values
				});
			}, 200);
		},
		attached: function () {
			this.$.dropdown.sizingTarget = this.$.autocomplete;
		}
	});

}());
