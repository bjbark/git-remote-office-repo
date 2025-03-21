/**
 * 검색 조건 필드
 *
 * 기본 설정으로는 폼클리어 버튼과 엔터키를 통한 조회 기능이 활성화 되어 있다.
 *
 * {@link #enterSubmit}을 통해 조회 기능을 제외시킨다.
 *
 * ## 사용법
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *		    title: 'Contact Info',
 *		    width: 300,
 *		    bodyPadding: 10,
 *		    renderTo: Ext.getBody(),
 *		    items: [{
 *		        xtype: 'searchfield',
 *		        name: 'name',
 *		        fieldLabel: 'Name',
 *		    }, {
 *		        xtype: 'searchfield',
 *		        name: 'email',
 *		        fieldLabel: 'Email Address',
 *		    }]
 *		});
 *
 */
Ext.define('Axt.form.field.SearchField', {
	extend: 'Ext.form.field.Text',
	alias: 'widget.searchfield',
	requires: ['Axt.form.field.plugin.ClearButton'],

	/**
	 * 생성자
	 */
	initComponent: function() {
		var me = this;
		me.plugins = ['clearbutton'];
		me.callParent();
	}

});