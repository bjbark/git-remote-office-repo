/**
 * 엔젤 프로젝트 공용 조회조건(지사 지부 조건 입력 부분)
 *
 */

Ext.define('module.common.view.angel.AngelSearchBroffice', {  extend:'Axt.form.Panel'
	,xtype	: 'module-common-angel-search-broffice'
	,height	: 20
	,style	: 'padding-top : 0;padding-bottom : 0;padding-left : 0;padding-right : 0'
	, border: 0
	,items	: [
		{	xtype	: 'fieldset'
			,border	: 0
			,style	: { borderColor	: '#263c63', borderStyle	: 'solid',background: '#dee8f4' }
			,flex	: 1
			,layout	: 'hbox'
			,items	: [
				{	fieldLabel	: Language.get( 'broff_nm','지사'),
					name		: 'broff2000_nm',
					xtype		: 'popupfield', editable : true, enableKeyEvents : true,
					width		: 250,
					pair		: 'broff2000_id',
					clearable	: true,
					value		: _global.frc_nm,
					readOnly    : !_global.frc_chg,
					popup		: {
						select	: 'SINGLE',
						widget	: 'lookup-branch2000-popup',
						params	: { stor_grp : _global.stor_grp },
						result	: function(records, nameField, pairField){
							nameField.setValue(records[0].get('broff_nm'));
							pairField.setValue(records[0].get('broff_id'));
							broff2000_cd = records[0].get('broff_id');
						}
					}
				},
				{	name		: 'broff2000_id',xtype :'textfield' , hidden : true , value		: _global.frc_cd,
				},
				{	fieldLabel	: Language.get( 'broff_nm','지부'),
					name		: 'broff_nm',
					xtype		: 'popupfield', editable : true, enableKeyEvents : true,
					width		: 250,
					pair		: 'broff_id',
					clearable	: true,
					value		: _global.brd_nm,
	 				readOnly    : !_global.brd_chg,
					popup		: {
						select	: 'SINGLE',
						widget	: 'lookup-branch3000-popup',
						params	: { stor_grp : _global.stor_grp },
						result	: function(records, nameField, pairField){
							nameField.setValue(records[0].get('broff_nm'));
							pairField.setValue(records[0].get('broff_id'));
						},
 						create : function (self ) {
 			 				Ext.merge(self.popup.params, {
 			 					prnt_id : _global.frc_cd
 			 				});
 			 			}
					}
				},
				{	name		: 'broff_id',xtype :'textfield' , hidden : true, value		: _global.brd_cd
				}
			]
	 	}
	]
});