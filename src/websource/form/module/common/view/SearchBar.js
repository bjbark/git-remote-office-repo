/**
 * 프로젝트 공용 조회조건(find_name 및 조회 버튼..)
 *
 * 사용 방법
Controller 내 requires 부문에
		'module.common.view.SearchBar'
Editor에서
		{	xtype	: 'module-common-searchBar'
		}
*/

Ext.define('module.common.view.SearchBar', {  extend:'Axt.form.Panel'
	,xtype	: 'module-common-searchBar'
	,height	: 41
	,style	: 'padding-top : 0;padding-bottom : 0;padding-left : 0;padding-right : 0'
	,items	: [
		{	xtype	: 'fieldset'
			,border	: 0
			,style	: { borderColor	: '#263c63', borderStyle	: 'solid',background: '#dee8f4' }
			,height	: 41
			,flex	: 1
			,layout	: 'hbox'
			,items	: [
				{	xtype		: 'fieldset'
					,border		: 3
					,flex		: 1
					,style		: { borderColor	: '#263c63', borderStyle	: 'solid' }
					,region		: 'center'
					,height		: 34
					,margin		: '3 3 3 0'
					,layout		: 'hbox'
					,items		: [
						{	xtype		: 'label',
							text		: 'SEARCH  | ',
							margin		: '7 10 0 0',
							cls			: 'my-label-style',
						},{	name		: 'find_name'     ,
							xtype		: 'searchfield',
							margin		: '3 10 0 0',
							emptyText	: '   자료를 검색할 검색어를 입력하세요....',
							flex		: 1,
							enableKeyEvents : true,
							listeners	: {
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == 9) {
										var searchButton = self.up('form').down('[action=selectAction]');
										searchButton.fireEvent('click', searchButton);
									}
								},
							}
						}
					]
				},{	xtype	: 'button'  ,action : Const.SELECT.action , cls: 'search-button', margin : '3 0 0 0',region : 'north' , tooltip : 'Data Select'
				}
			]
		}
	]
});