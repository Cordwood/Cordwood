import { React } from "@webpack/common";
import { findByCode, findByDisplayName, findByNestedProps, findByProps } from "@webpack/filters";
import Updater from "@/ui/settings/components/Updater";
// import FormTitle from "@uikit/components/FormTitle";

const Scroller = findByDisplayName("Scroller");
const { FormSection, FormTitle } = findByProps("FormSection");
// const { default: Flex } = findByNestedProps("Justify", "Wrap", "Align");
const Flex = findByCode(/.{1,2}\.Child=.*?,.{1,2}\.Direction=.*?,/);

export default class AboutView extends React.Component {
    static displayName = "AboutView";

    render() {
        console.log(Flex);
        return (
            <FormSection title="About Cordwood" tag={FormTitle.Tags.H2}>
                <Flex direction={Flex.Direction.VERTICAL}>
                    <Flex.Child>
                        <img style={{ width: "100%" }} className="margin-bottom-20" src={"https://raw.githubusercontent.com/Cordwood/Cordwood/master/.assets/banner/cordwood-transparent-black.png"} />
                    </Flex.Child>
                    <Flex.Child>
                        <FormTitle tag={FormTitle.Tags.H5}>Made with ❤️ by Marsh and Alyxia</FormTitle>
                    </Flex.Child>
                </Flex>
                {/* <Flex>
                    <Flex.Child>
                    </Flex.Child>
                    <Flex.Child>
                    </Flex.Child>
                </Flex> */}

                {/* <Updater /> */}
            </FormSection>
        );
    }
}
