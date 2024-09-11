<script lang="ts" setup>
    import { conversionWhitelist} from "@mtfm/core-configs";
    import type { IConfigurationSectionDescription } from "@mtfm/core-models";
    import { RouterLink } from "vue-router"; 
    import { ref } from "vue";

    import NavSection from "@/components/nav-section/NavSection.vue";

    //const sources = conversionWhitelist.getDistinctSources();
    //const targets = conversionWhitelist.getDistinctTargets();

    const configurationsDefault = conversionWhitelist.getConversionDescription("docx", "html")?.allowedConfigurations || [];
    let configurations = ref<IConfigurationSectionDescription[]>(configurationsDefault);

    let from = ref<string>("docx");
    let to = ref<string>("html");

    /*
    const handleSubmit = (event: Event) => {
        event?.preventDefault();
        configurations.value = conversionWhitelist.getConversionDescription(from.value, to.value)?.allowedConfigurations || [];
    } 
    */
</script>

<template>
    <nav>
        <NavSection title="Usage">
            <ul className="nav-menu">
                <li>
                    <RouterLink to="/usage/cli">CLI</RouterLink>
                </li>
                <li>
                    <RouterLink to="/usage/library">Library</RouterLink>
                </li>
            </ul>
        </NavSection>
        <NavSection title="Configuration">
            <!--
            <form class="nav-menu-selector" @submit="handleSubmit">
                <select name="from" v-model="from">
                    <option v-for="source in sources" :value="source.from.fileExtension">
                        {{source.from.name}}
                    </option>
                </select>
                <span> to </span>
                <select name="to" v-model="to">
                    <option v-for="target in targets" :value="target.to.fileExtension">
                        {{target.to.name}}
                    </option>
                </select>
                <button type="submit">Show</button>
            </form>
            -->

            <ul className="nav-menu">
                <li v-for="configuration in configurations" :key="configuration.category">
                    <RouterLink :to="`/configuration/${from}-to-${to}/${configuration.category}`">{{configuration.name}}</RouterLink>
                </li>
            </ul>
        </NavSection>
    </nav>
</template>