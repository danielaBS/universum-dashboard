import React, { Component } from 'react';
import Image from '../imageComponent/imageComponent';

class ListIcons extends Component {
    render() {
        return (
            <div className="center">
                <h2>Iconos</h2>
                <h3>Action</h3>
                <div className="flex listicon">
                    <Image src='./images/action/search.svg'></Image>
                    <Image src='./images/action/help.svg'></Image>
                    <Image src='./images/action/home.svg'></Image>
                    <Image src='./images/action/settings.svg'></Image>
                    <Image src='./images/action/account_circle.svg'></Image>
                    <Image src='./images/action/check_Circle.svg'></Image>
                    <Image src='./images/action/Info.svg'></Image>
                    <Image src='./images/action/delete.svg'></Image>
                    <Image src='./images/action/shopping_cart.svg'></Image>
                    <Image src='./images/action/copyright.svg'></Image>
                    <Image src='./images/action/login.svg'></Image>
                    <Image src='./images/action/logout.svg'></Image>
                    <Image src='./images/action/print.svg'></Image>
                    <Image src='./images/action/shopping_cart_add.svg'></Image>
                    <Image src='./images/action/visibility.svg'></Image>
                    <Image src='./images/action/visibility_off.svg'></Image>
                    <Image src='./images/action/zoom_in.svg'></Image>
                    <Image src='./images/action/zoom_out.svg'></Image>
                </div>
                <h3>Communication</h3>
                <div className="flex listicon">
                    <Image src='./images/communication/Email.svg'></Image>
                    <Image src='./images/communication/chat.svg'></Image>
                    <Image src='./images/communication/location.svg'></Image>
                </div>

                <h3>Content</h3>
                <div className="flex listicon">
                    <Image src='./images/content/add_circle.svg'></Image>
                    <Image src='./images/content/clear.svg'></Image>
                    <Image src='./images/content/remove.svg'></Image>
                    <Image src='./images/content/save.svg'></Image>
                    <Image src='./images/content/backspace.svg'></Image>
                    <Image src='./images/content/file_copy.svg'></Image>
                    <Image src='./images/content/reply.svg'></Image>
                    <Image src='./images/content/send.svg'></Image>
                    <Image src='./images/content/add_box.svg'></Image>
                    <Image src='./images/content/block.svg'></Image>
                    <Image src='./images/content/link.svg'></Image>
                    <Image src='./images/content/report.svg'></Image>
                    <Image src='./images/content/undo.svg'></Image>
                </div>

                <h3>Editor</h3>
                <div className="flex listicon">
                    <Image src='./images/editor/attach_file.svg'></Image>
                    <Image src='./images/editor/drive_file.svg'></Image>
                    <Image src='./images/editor/insert_photo.svg'></Image>
                    <Image src='./images/editor/mode_edit.svg'></Image>
                </div>

                <h3>Image</h3>
                <div className="flex listicon">
                    <Image src='./images/image/add_photo.svg'></Image>
                    <Image src='./images/image/collection.svg'></Image>
                    <Image src='./images/imageComponent/imageComponent.svg'></Image>
                    <Image src='./images/imageComponent/imageComponent_edit.svg'></Image>
                    <Image src='./images/image/photo_camera.svg'></Image>
                    <Image src='./images/default/default.png'></Image>
                </div>

                <h3>Notification</h3>
                <div className="flex listicon">
                    <Image src='./images/notification/event_busy.svg'></Image>
                    <Image src='./images/notification/event_note.svg'></Image>
                    <Image src='./images/notification/priority_high _event_available.svg'></Image>
                </div>

                <h3>Alert</h3>
                <div className="flex listicon">
                    <Image src='./images/alert/Error.svg'></Image>
                    <Image src='./images/alert/information.svg'></Image>
                    <Image src='./images/alert/notification_important.svg'></Image>
                    <Image src='./images/alert/warning.svg'></Image>
                </div>


                <h3>File</h3>
                <div className="flex listicon">
                    <Image src='./images/file/Cloud.svg'></Image>
                    <Image src='./images/file/download.svg'></Image>
                    <Image src='./images/file/file_upload.svg'></Image>
                    <Image src='./images/file/attach_email.svg'></Image>
                    <Image src='./images/file/download_Cloud.svg'></Image>
                    <Image src='./images/file/upload.svg'></Image>
                    <Image src='./images/file/attachment.svg'></Image>
                    <Image src='./images/file/file_download.svg'></Image>
                    <Image src='./images/file/upload_cloud.svg'></Image>
                </div>

                <h3>Navegation</h3>
                <div className="flex listicon">
                    <Image src='./images/navigation/arrow_back.svg'></Image>
                    <Image src='./images/navigation/check.svg'></Image>
                    <Image src='./images/navigation/expand_less.svg'></Image>
                    <Image src='./images/navigation/fullscreen.svg'></Image>
                    <Image src='./images/navigation/menu.svg'></Image>
                    <Image src='./images/navigation/arrow_forward.svg'></Image>
                    <Image src='./images/navigation/close.svg'></Image>
                    <Image src='./images/navigation/expand_more.svg'></Image>
                    <Image src='./images/navigation/fullscreen_exit.svg'></Image>
                </div>

                <h3>Social</h3>
                <div className="flex listicon">
                    <Image width="30%" src='./images/social/dont_like.svg'></Image>
                    <Image width="30%" src='./images/social/instagram.svg'></Image>
                    <Image width="30%" src='./images/social/linkedin.svg'></Image>
                    <Image width="30%" src='./images/social/share.svg'></Image>
                    <Image width="30%" src='./images/social/facebook.svg'></Image>
                    <Image width="30%" src='./images/social/like.svg'></Image>
                    <Image width="30%" src='./images/social/notification.svg'></Image>
                    <Image width="30%" src='./images/social/twitter.svg'></Image>

                </div>


            </div>
        )
    }
}

export default ListIcons; // Don’t forget to use export default!