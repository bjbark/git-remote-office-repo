/**
 * 프로젝트 공용 폼
 *
 * ## 주목적은 폼에서 사용하는 필드를 포함하도록 한다.
 * ## 기본설정
 */
Ext.define('Axt.form.Panel', { extend: 'Ext.form.Panel',

	alias: 'widget.form-panel',
	requires:
	[
	    'Axt.form.field.LookupField' ,
	    'Axt.form.field.SearchField' ,
	    'Axt.form.field.PopupField'  ,
	    'Axt.form.field.MonthField'  ,
	    'Axt.form.field.NumericField',
	    'Axt.form.field.BetweenField',
	    'Axt.form.field.DateTimeField',
	    'Axt.form.field.Carousel'
	],
	fieldDefaults: { labelAlign : 'right', labelWidth : 70, labelSeparator : '' },

	/**
	 * GRID 내의 데이터를 지운다.
	 */
	eraser : function(){
		this.getForm().reset();
	}

});
